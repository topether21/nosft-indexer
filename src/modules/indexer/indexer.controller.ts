import axios from "axios";
import { BLOCKSTREAM_API, TURBO_API } from "~/lib/constants";
import { omit } from "lodash";
import { RawUtxo, RowInscription } from "~/types";

const getInscriptions = async (
  address: string
): Promise<Array<RowInscription>> =>
  (await axios.get(`${TURBO_API}/wallet/${address}/inscriptions`)).data;

const getUtxoForInscription = async (
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
