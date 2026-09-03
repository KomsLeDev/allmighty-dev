const PALETTE = [
  '#2563eb', '#dc2626', '#059669', '#d97706',
  '#7c3aed', '#db2777', '#0891b2', '#65a30d',
  '#ea580c', '#4f46e5',
];

export function colorForIndex(index) {
  return PALETTE[index % PALETTE.length];
}
