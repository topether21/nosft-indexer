import axios from "axios";
import { BLOCKSTREAM_API, TURBO_API } from "~/lib/constants";
import { omit } from "lodash";
import { RawUtxo, RowInscription } from "~/types";
import { prisma } from "~/lib/prisma";
import util from "util";

export const getInscriptions = async (
  address: string
): Promise<Array<RowInscription>> =>
  (await axios.get(`${TURBO_API}/wallet/${address}/inscriptions`)).data;

export const getUtxoForInscription = async (
  inscription: RowInscription,
  address: string
) => {
  const {
    data: {
      inscription: { outpoint },
    },
  } = await axios.get(`${TURBO_API}/inscription/${inscription.id}/outpoint`);

  const txid = outpoint
    .substring(0, outpoint.length - 8)
    .match(/[a-fA-F0-9]{2}/g)
    .reverse()
    .join("");

  const utxo: RawUtxo = (await axios.get(`${BLOCKSTREAM_API}/tx/${txid}`)).data;
  const { value } =
    utxo.vout.find((v) => v.scriptpubkey_address === address) || {};
  return {
    ...omit(utxo, "vin", "vout"),
    inscriptionId: inscription?.id,
    ...inscription,
    value,
  };
};

type ProcessAddressProps = {
  address: string;
};

export const processAddress = async ({ address }: ProcessAddressProps) => {
  let startTime = performance.now();

  const inscriptions = await getInscriptions(address);
  const promises = await Promise.allSettled(
    inscriptions.map((inscription) =>
      getUtxoForInscription(inscription, address)
    )
  );
  const inscriptionsWithUtxo = (
    promises.filter((i) => i.status === "fulfilled") as any
  ).map((i: any) => ({
    address,
    txid: i.value.txid,
    version: i.value.version,
    size: i.value.size,
    weight: i.value.weight,
    fee: i.value.fee,
    status_confirmed: i.value.status.confirmed,
    status_block_height: i.value.status.block_height,
    status_block_hash: i.value.status.block_hash,
    inscriptionId: i.value.inscriptionId,
    collection_creator_address: i.value.collection?.creator_address || null,
    collection_name: i.value.collection?.name || null,
    collection_slug: i.value.collection?.slug || null,
    content_type: i.value.content_type,
    escrow: i.value.escrow,
    id: i.value.id,
    meta: i.value.meta || {},
    num: i.value.num,
    value: i.value.value,
  })); // TODO: fix any

  let endTime = performance.now();
  console.log(
    `Call to doSomething took ${(endTime - startTime) / 1000} seconds`
  );

  startTime = performance.now();
  const pri = await prisma.accounts.upsert({
    where: { address },
    update: { address },
    create: { address },
  });
  endTime = performance.now();
  console.log(
    `Call to doSomething took ${(endTime - startTime) / 1000} seconds`
  );
  startTime = performance.now();

  await prisma.inscriptions.deleteMany({ where: { address } });

  endTime = performance.now();
  console.log(
    `Call to doSomething took ${(endTime - startTime) / 1000} seconds`
  );
  startTime = performance.now();

  try {
    const b = await prisma.inscriptions.createMany({
      data: inscriptionsWithUtxo,
      skipDuplicates: true,
    });
    console.log({ b });
  } catch (err) {
    console.error(err);
  }

  endTime = performance.now();
  console.log(
    `Call to doSomething took ${(endTime - startTime) / 1000} seconds`
  );
  startTime = performance.now();

  console.log("completed");
};
