// Sanitized portfolio example.
// Deterministic checks decide PASS/FAIL; the LLM does not grade its own work.

const checks = [
  { name: 'http', pass: true },
  { name: 'selfCanonical', pass: true },
  { name: 'uniqueH1', pass: true },
  { name: 'reciprocalHreflang', pass: true },
  { name: 'noUnsupportedCommercialSchema', pass: true },
  { name: 'anonymousPublicHtml', pass: true },
];

const failed = checks.filter((x) => !x.pass);

const result = {
  overall_result: failed.length === 0 ? 'PASS' : 'FAIL',
  failed_checks: failed.map((x) => x.name),
  checked_at: new Date().toISOString(),
};

console.log(JSON.stringify(result, null, 2));
process.exit(failed.length === 0 ? 0 : 1);
