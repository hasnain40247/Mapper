// Countries that share a land border (using names from Natural Earth TopoJSON)
// Each key maps to an array of neighboring country names
export const BORDERS: Record<string, string[]> = {
    "Afghanistan": ["China", "Iran", "Pakistan", "Tajikistan", "Turkmenistan", "Uzbekistan"],
    "Albania": ["Greece", "Kosovo", "North Macedonia", "Montenegro"],
    "Algeria": ["Libya", "Mali", "Mauritania", "Morocco", "Niger", "Tunisia", "W. Sahara"],
    "Angola": ["Dem. Rep. Congo", "Congo", "Namibia", "Zambia"],
    "Argentina": ["Bolivia", "Brazil", "Chile", "Paraguay", "Uruguay"],
    "Armenia": ["Azerbaijan", "Georgia", "Iran", "Turkey"],
    "Austria": ["Czechia", "Germany", "Hungary", "Italy", "Liechtenstein", "Slovakia", "Slovenia", "Switzerland"],
    "Azerbaijan": ["Armenia", "Georgia", "Iran", "Russia", "Turkey"],
    "Bangladesh": ["India", "Myanmar"],
    "Belarus": ["Latvia", "Lithuania", "Poland", "Russia", "Ukraine"],
    "Belgium": ["France", "Germany", "Luxembourg", "Netherlands"],
    "Belize": ["Guatemala", "Mexico"],
    "Benin": ["Burkina Faso", "Niger", "Nigeria", "Togo"],
    "Bhutan": ["China", "India"],
    "Bolivia": ["Argentina", "Brazil", "Chile", "Paraguay", "Peru"],
    "Bosnia and Herz.": ["Croatia", "Montenegro", "Serbia"],
    "Botswana": ["Namibia", "South Africa", "Zimbabwe", "Zambia"],
    "Brazil": ["Argentina", "Bolivia", "Colombia", "France", "Guyana", "Paraguay", "Peru", "Suriname", "Uruguay", "Venezuela"],
    "Brunei": ["Malaysia"],
    "Bulgaria": ["Greece", "North Macedonia", "Romania", "Serbia", "Turkey"],
    "Burkina Faso": ["Benin", "Côte d'Ivoire", "Ghana", "Mali", "Niger", "Togo"],
    "Burundi": ["Dem. Rep. Congo", "Rwanda", "Tanzania"],
    "Cambodia": ["Laos", "Thailand", "Vietnam"],
    "Cameroon": ["Central African Rep.", "Chad", "Congo", "Eq. Guinea", "Gabon", "Nigeria"],
    "Canada": ["United States of America"],
    "Central African Rep.": ["Cameroon", "Chad", "Dem. Rep. Congo", "Congo", "S. Sudan", "Sudan"],
    "Chad": ["Cameroon", "Central African Rep.", "Libya", "Niger", "Nigeria", "Sudan"],
    "Chile": ["Argentina", "Bolivia", "Peru"],
    "China": ["Afghanistan", "Bhutan", "India", "Kazakhstan", "Kyrgyzstan", "Laos", "Mongolia", "Myanmar", "Nepal", "North Korea", "Pakistan", "Russia", "Tajikistan", "Vietnam"],
    "Colombia": ["Brazil", "Ecuador", "Panama", "Peru", "Venezuela"],
    "Congo": ["Angola", "Cameroon", "Central African Rep.", "Dem. Rep. Congo", "Gabon"],
    "Costa Rica": ["Nicaragua", "Panama"],
    "Croatia": ["Bosnia and Herz.", "Hungary", "Montenegro", "Serbia", "Slovenia"],
    "Czechia": ["Austria", "Germany", "Poland", "Slovakia"],
    "Côte d'Ivoire": ["Burkina Faso", "Ghana", "Guinea", "Liberia", "Mali"],
    "Dem. Rep. Congo": ["Angola", "Burundi", "Central African Rep.", "Congo", "Rwanda", "S. Sudan", "Tanzania", "Uganda", "Zambia"],
    "Denmark": ["Germany"],
    "Djibouti": ["Eritrea", "Ethiopia", "Somalia"],
    "Dominican Rep.": ["Haiti"],
    "Ecuador": ["Colombia", "Peru"],
    "Egypt": ["Libya", "Palestine", "Sudan"],
    "El Salvador": ["Guatemala", "Honduras"],
    "Eq. Guinea": ["Cameroon", "Gabon"],
    "Eritrea": ["Djibouti", "Ethiopia", "Sudan"],
    "Estonia": ["Latvia", "Russia"],
    "eSwatini": ["Mozambique", "South Africa"],
    "Ethiopia": ["Djibouti", "Eritrea", "Kenya", "S. Sudan", "Somalia", "Sudan"],
    "Finland": ["Norway", "Russia", "Sweden"],
    "France": ["Belgium", "Brazil", "Germany", "Italy", "Luxembourg", "Spain", "Switzerland"],
    "Gabon": ["Cameroon", "Congo", "Eq. Guinea"],
    "Gambia": ["Senegal"],
    "Georgia": ["Armenia", "Azerbaijan", "Russia", "Turkey"],
    "Germany": ["Austria", "Belgium", "Czechia", "Denmark", "France", "Luxembourg", "Netherlands", "Poland", "Switzerland"],
    "Ghana": ["Burkina Faso", "Côte d'Ivoire", "Togo"],
    "Greece": ["Albania", "Bulgaria", "North Macedonia", "Turkey"],
    "Guatemala": ["Belize", "El Salvador", "Honduras", "Mexico"],
    "Guinea": ["Côte d'Ivoire", "Guinea-Bissau", "Liberia", "Mali", "Senegal", "Sierra Leone"],
    "Guinea-Bissau": ["Guinea", "Senegal"],
    "Guyana": ["Brazil", "Suriname", "Venezuela"],
    "Haiti": ["Dominican Rep."],
    "Honduras": ["El Salvador", "Guatemala", "Nicaragua"],
    "Hungary": ["Austria", "Croatia", "Romania", "Serbia", "Slovakia", "Slovenia", "Ukraine"],
    "India": ["Bangladesh", "Bhutan", "China", "Myanmar", "Nepal", "Pakistan"],
    "Indonesia": ["Malaysia", "Papua New Guinea", "Timor-Leste"],
    "Iran": ["Afghanistan", "Armenia", "Azerbaijan", "Iraq", "Pakistan", "Turkey", "Turkmenistan"],
    "Iraq": ["Iran", "Jordan", "Kuwait", "Saudi Arabia", "Syria", "Turkey"],
    "Israel": ["Egypt", "Jordan", "Lebanon", "Palestine", "Syria"],
    "Italy": ["Austria", "France", "Slovenia", "Switzerland"],
    "Jordan": ["Iraq", "Israel", "Palestine", "Saudi Arabia", "Syria"],
    "Kazakhstan": ["China", "Kyrgyzstan", "Russia", "Turkmenistan", "Uzbekistan"],
    "Kenya": ["Ethiopia", "Somalia", "S. Sudan", "Tanzania", "Uganda"],
    "Kosovo": ["Albania", "North Macedonia", "Montenegro", "Serbia"],
    "Kuwait": ["Iraq", "Saudi Arabia"],
    "Kyrgyzstan": ["China", "Kazakhstan", "Tajikistan", "Uzbekistan"],
    "Laos": ["Cambodia", "China", "Myanmar", "Thailand", "Vietnam"],
    "Latvia": ["Belarus", "Estonia", "Lithuania", "Russia"],
    "Lebanon": ["Israel", "Syria"],
    "Lesotho": ["South Africa"],
    "Liberia": ["Côte d'Ivoire", "Guinea", "Sierra Leone"],
    "Libya": ["Algeria", "Chad", "Egypt", "Niger", "Sudan", "Tunisia"],
    "Lithuania": ["Belarus", "Latvia", "Poland", "Russia"],
    "Luxembourg": ["Belgium", "France", "Germany"],
    "Malaysia": ["Brunei", "Indonesia", "Thailand"],
    "Mali": ["Algeria", "Burkina Faso", "Côte d'Ivoire", "Guinea", "Mauritania", "Niger", "Senegal"],
    "Mauritania": ["Algeria", "Mali", "Senegal", "W. Sahara"],
    "Mexico": ["Belize", "Guatemala", "United States of America"],
    "Moldova": ["Romania", "Ukraine"],
    "Mongolia": ["China", "Russia"],
    "Montenegro": ["Albania", "Bosnia and Herz.", "Croatia", "Kosovo", "Serbia"],
    "Morocco": ["Algeria", "W. Sahara", "Spain"],
    "Mozambique": ["eSwatini", "Malawi", "South Africa", "Tanzania", "Zambia", "Zimbabwe"],
    "Myanmar": ["Bangladesh", "China", "India", "Laos", "Thailand"],
    "Namibia": ["Angola", "Botswana", "South Africa", "Zambia"],
    "Nepal": ["China", "India"],
    "Netherlands": ["Belgium", "Germany"],
    "Nicaragua": ["Costa Rica", "Honduras"],
    "Niger": ["Algeria", "Benin", "Burkina Faso", "Chad", "Libya", "Mali", "Nigeria"],
    "Nigeria": ["Benin", "Cameroon", "Chad", "Niger"],
    "North Korea": ["China", "South Korea", "Russia"],
    "North Macedonia": ["Albania", "Bulgaria", "Greece", "Kosovo", "Serbia"],
    "Norway": ["Finland", "Russia", "Sweden"],
    "Oman": ["Saudi Arabia", "United Arab Emirates", "Yemen"],
    "Pakistan": ["Afghanistan", "China", "India", "Iran"],
    "Palestine": ["Egypt", "Israel", "Jordan"],
    "Panama": ["Colombia", "Costa Rica"],
    "Papua New Guinea": ["Indonesia"],
    "Paraguay": ["Argentina", "Bolivia", "Brazil"],
    "Peru": ["Bolivia", "Brazil", "Chile", "Colombia", "Ecuador"],
    "Poland": ["Belarus", "Czechia", "Germany", "Lithuania", "Russia", "Slovakia", "Ukraine"],
    "Qatar": ["Saudi Arabia"],
    "Romania": ["Bulgaria", "Hungary", "Moldova", "Serbia", "Ukraine"],
    "Russia": ["Azerbaijan", "Belarus", "China", "Estonia", "Finland", "Georgia", "Kazakhstan", "Latvia", "Lithuania", "Mongolia", "North Korea", "Norway", "Poland", "Ukraine"],
    "Rwanda": ["Burundi", "Dem. Rep. Congo", "Tanzania", "Uganda"],
    "S. Sudan": ["Central African Rep.", "Dem. Rep. Congo", "Ethiopia", "Kenya", "Sudan", "Uganda"],
    "Saudi Arabia": ["Iraq", "Jordan", "Kuwait", "Oman", "Qatar", "United Arab Emirates", "Yemen"],
    "Senegal": ["Gambia", "Guinea", "Guinea-Bissau", "Mali", "Mauritania"],
    "Serbia": ["Bosnia and Herz.", "Bulgaria", "Croatia", "Hungary", "Kosovo", "Montenegro", "North Macedonia", "Romania"],
    "Sierra Leone": ["Guinea", "Liberia"],
    "Slovakia": ["Austria", "Czechia", "Hungary", "Poland", "Ukraine"],
    "Slovenia": ["Austria", "Croatia", "Hungary", "Italy"],
    "Somalia": ["Djibouti", "Ethiopia", "Kenya"],
    "South Africa": ["Botswana", "eSwatini", "Lesotho", "Mozambique", "Namibia", "Zimbabwe"],
    "South Korea": ["North Korea"],
    "Spain": ["France", "Morocco", "Portugal"],
    "Sudan": ["Central African Rep.", "Chad", "Egypt", "Eritrea", "Ethiopia", "Libya", "S. Sudan"],
    "Suriname": ["Brazil", "France", "Guyana"],
    "Sweden": ["Finland", "Norway"],
    "Switzerland": ["Austria", "France", "Germany", "Italy"],
    "Syria": ["Iraq", "Israel", "Jordan", "Lebanon", "Turkey"],
    "Tajikistan": ["Afghanistan", "China", "Kyrgyzstan", "Uzbekistan"],
    "Tanzania": ["Burundi", "Dem. Rep. Congo", "Kenya", "Malawi", "Mozambique", "Rwanda", "Uganda", "Zambia"],
    "Thailand": ["Cambodia", "Laos", "Malaysia", "Myanmar"],
    "Timor-Leste": ["Indonesia"],
    "Togo": ["Benin", "Burkina Faso", "Ghana"],
    "Tunisia": ["Algeria", "Libya"],
    "Turkey": ["Armenia", "Azerbaijan", "Bulgaria", "Georgia", "Greece", "Iran", "Iraq", "Syria"],
    "Turkmenistan": ["Afghanistan", "Iran", "Kazakhstan", "Uzbekistan"],
    "Uganda": ["Dem. Rep. Congo", "Kenya", "Rwanda", "S. Sudan", "Tanzania"],
    "Ukraine": ["Belarus", "Hungary", "Moldova", "Poland", "Romania", "Russia", "Slovakia"],
    "United Arab Emirates": ["Oman", "Saudi Arabia"],
    "United States of America": ["Canada", "Mexico"],
    "Uruguay": ["Argentina", "Brazil"],
    "Uzbekistan": ["Afghanistan", "Kazakhstan", "Kyrgyzstan", "Tajikistan", "Turkmenistan"],
    "Venezuela": ["Brazil", "Colombia", "Guyana"],
    "Vietnam": ["Cambodia", "China", "Laos"],
    "W. Sahara": ["Algeria", "Mauritania", "Morocco"],
    "Yemen": ["Oman", "Saudi Arabia"],
    "Zambia": ["Angola", "Botswana", "Dem. Rep. Congo", "Malawi", "Mozambique", "Namibia", "Tanzania", "Zimbabwe"],
    "Zimbabwe": ["Botswana", "Mozambique", "South Africa", "Zambia"],
  };
  
  // BFS to find a path between two countries
  export function findPath(from: string, to: string): string[] | null {
    if (from === to) return [from];
    const queue: string[][] = [[from]];
    const visited = new Set<string>([from]);
  
    while (queue.length > 0) {
      const path = queue.shift()!;
      const current = path[path.length - 1];
      const neighbors = BORDERS[current] || [];
  
      for (const neighbor of neighbors) {
        if (neighbor === to) return [...path, neighbor];
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);
        }
      }
    }
    return null;
  }
  
  // Cross-water connections to exclude when picking pairs
  // These are technically land borders but cross water/overseas territories
  const CROSS_WATER_EDGES: [string, string][] = [
    ["France", "Brazil"],       // French Guiana
    ["France", "Suriname"],     // French Guiana
    ["Spain", "Morocco"],       // Ceuta/Melilla
    ["Indonesia", "Timor-Leste"],
    ["Indonesia", "Papua New Guinea"],
    ["Malaysia", "Indonesia"],
    ["Malaysia", "Brunei"],
  ];
  
  // Landmass groups — countries must be in the same group
  const LANDMASSES: string[][] = [
    // Afro-Eurasia
    [
      "Afghanistan", "Albania", "Algeria", "Angola", "Armenia", "Austria", "Azerbaijan",
      "Bangladesh", "Belarus", "Belgium", "Benin", "Bhutan", "Bosnia and Herz.", "Botswana",
      "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Central African Rep.",
      "Chad", "China", "Congo", "Croatia", "Côte d'Ivoire", "Czechia", "Dem. Rep. Congo",
      "Denmark", "Djibouti", "Egypt", "Eq. Guinea", "Eritrea", "Estonia", "eSwatini",
      "Ethiopia", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
      "Greece", "Guinea", "Guinea-Bissau", "Hungary", "India", "Iran", "Iraq", "Israel",
      "Italy", "Jordan", "Kazakhstan", "Kenya", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos",
      "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Lithuania", "Luxembourg",
      "Malawi", "Mali", "Mauritania", "Moldova", "Mongolia", "Montenegro", "Morocco",
      "Mozambique", "Myanmar", "Namibia", "Nepal", "Netherlands", "Niger", "Nigeria",
      "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palestine",
      "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "S. Sudan",
      "Saudi Arabia", "Senegal", "Serbia", "Sierra Leone", "Slovakia", "Slovenia",
      "Somalia", "South Africa", "South Korea", "Spain", "Sudan", "Sweden",
      "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tunisia",
      "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates",
      "Uzbekistan", "Vietnam", "W. Sahara", "Yemen", "Zambia", "Zimbabwe",
    ],
    // Americas
    [
      "Argentina", "Belize", "Bolivia", "Brazil", "Canada", "Chile", "Colombia",
      "Costa Rica", "Ecuador", "El Salvador", "Guatemala", "Guyana", "Honduras",
      "Mexico", "Nicaragua", "Panama", "Paraguay", "Peru", "Suriname",
      "United States of America", "Uruguay", "Venezuela",
    ],
  ];
  
  const countryToLandmass = new Map<string, number>();
  LANDMASSES.forEach((group, idx) => {
    group.forEach((c) => countryToLandmass.set(c, idx));
  });
  
  // Check if a country lies on any valid same-landmass path from A to B
  export function isOnValidPath(country: string, from: string, to: string): boolean {
    const landmass = countryToLandmass.get(from);
    if (landmass === undefined) return false;
  
    function bfsSameLandmass(start: string, end: string): boolean {
      const queue = [start];
      const visited = new Set([start]);
      while (queue.length > 0) {
        const cur = queue.shift()!;
        if (cur === end) return true;
        for (const n of (BORDERS[cur] || [])) {
          if (!visited.has(n) && countryToLandmass.get(n) === landmass) {
            visited.add(n);
            queue.push(n);
          }
        }
      }
      return false;
    }
  
    // Country must be on the same landmass AND reachable from A AND can reach B
    if (countryToLandmass.get(country) !== landmass) return false;
    return bfsSameLandmass(from, country) && bfsSameLandmass(country, to);
  }
  
  // Pick two connected countries on the same landmass with `minDistance` to `maxDistance` steps
  export function pickConnectedPair(minDistance = 3, maxDistance = 10): [string, string] {
    const keys = Object.keys(BORDERS).filter((k) => countryToLandmass.has(k));
    for (let attempts = 0; attempts < 300; attempts++) {
      const a = keys[Math.floor(Math.random() * keys.length)];
      const b = keys[Math.floor(Math.random() * keys.length)];
      if (a === b) continue;
      // Must be on same landmass
      if (countryToLandmass.get(a) !== countryToLandmass.get(b)) continue;
      const path = findPath(a, b);
      if (path && path.length >= minDistance + 1 && path.length <= maxDistance + 1) {
        return [a, b];
      }
    }
    // Fallback: known good pair
    return ["France", "China"];
  }