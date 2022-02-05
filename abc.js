const a = [
  {
    id: "b9ad7c126d5fbc06b85ab40e03337a1dfde9f009fa60d0479397176bc4cd535b",
    txIns: {
      txOutId: "15",
      txOutIndex: 3,
      signature:
        "30450220232f8670fb93528475964b1f5a76dd7b2a0762301edc528e69de578e520e4ebe022100abf850c1aa1011f08d0bd4ee2a018f4a31ccf4a95e1a89585cc699b35f859448",
    },
    txOuts: { address: "동", amount: "100" },
  },
];

console.log(JSON.stringify(a[0]));
console.log(a[0].toString());
