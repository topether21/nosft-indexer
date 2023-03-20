const rawInscription = {
  collection: null,
  content_type: "text/plain;charset=utf-8",
  escrow: null,
  id: "412973119266e8ce903340f5867ce45d23757958ea67db6764bb1ae240fe3b1ei0",
  meta: null,
  num: 448936,
};

const rawUtxo = {
  txid: "01dc00f6465b26bcab8c4ff0c811da4f4c07313d57c08f7c867027b591e3c7d2",
  version: 2,
  locktime: 0,
  vin: [
    {
      txid: "a3259a7646e0e681d7df8adc692b058e29f2bf409821ce1fab66b41921b6b701",
      vout: 0,
      prevout: [Object],
      scriptsig: "",
      scriptsig_asm: "",
      witness: [Array],
      is_coinbase: false,
      sequence: 4294967295,
    },
  ],
  vout: [
    {
      scriptpubkey:
        "5120d5e19bcba9c3442bae90beea0dee2e5760177ee7ac5d4196118e657bbb302141",
      scriptpubkey_asm:
        "OP_PUSHNUM_1 OP_PUSHBYTES_32 d5e19bcba9c3442bae90beea0dee2e5760177ee7ac5d4196118e657bbb302141",
      scriptpubkey_type: "v1_p2tr",
      scriptpubkey_address:
        "bc1p6hsehjafcdzzht5shm4qmm3w2aspwlh843w5r9s33ejhhwesy9qss2hxhp",
      value: 8446,
    },
  ],
  size: 162,
  weight: 444,
  fee: 777,
  status: {
    confirmed: true,
    block_height: 780698,
    block_hash:
      "000000000000000000045cdecebee2a7fb0b219ba0260b0d8d87bccc4d42469e",
    block_time: 1678753626,
  },
};
