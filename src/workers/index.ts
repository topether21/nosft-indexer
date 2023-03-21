import { processAddress } from "~/workers/controller";

(async () => {
  const address =
    "bc1p8l0pstx8umh6dx3e8vtw7sd3pspe9r0nh94v7ncwkqleljnr5zdqa3cvlm";
  processAddress({ address });
})();
