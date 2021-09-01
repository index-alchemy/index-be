/* 

INPUT:
{
  description (String): the name of the sprint
  G (Number): the number of groups to create
  pitches (Array): the pitches in the sprint
  preferences (Array of Arrays of project ids): the preferences for the sprint
}

*/

const analyzeResult = (data, result, loud = false) => {
  let score = 0;
  const placements = [];
  placements.length = data.pitches.length; placements.fill(0);

  for (let i = 0; i < result.length; i++) {
    const place = data.preferences[i].indexOf(result[i]);
    score += (place + 1) ** 2;
    placements[place]++;
  };

  // print out results
  if (loud) {
    const mssg = [];
    mssg.push(`\n=== ${data.description} ===`);
    mssg.push(`Score: ${score}\n`)
    
    for (let i = 0; i < placements.length; i++) mssg.push(`choice #${i + 1}: ${placements[i]}`);
    console.log(mssg.join('\n'));
  }

  return [score, placements];
};

const findTopGroups = data => {
  let scores = {};

  data.pitches.forEach(proj => scores[proj] = 0);

  for (let i = 0; i < data.preferences.length; i++) {
    const vote = data.preferences[i];
    scores[vote[0]]++;
    scores[vote[vote.length - 1]]--;
  };

  const groups = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  
  return groups.map(arr => arr[0]).slice(0, data.G);
};

const literallyRandom = (preferences, pitches) => {
  const result = [];

  // fix incomplete preferences
  preferences.map(prefList => {
    for (let pitch of pitches) if (!prefList.includes(pitch)) prefList.push(pitch);
  });

  const alreadyAssigned = new Set();
  const groupCounts = {};
  const groupSize = Math.floor(preferences.length / pitches.length);
  let remainder = preferences.length % pitches.length;
  for (let i = 0; i < preferences.length; i++) {
    // get an index of a voter that hasn't already had their group assigned
    let index = Math.floor(Math.random() * preferences.length);
    while (alreadyAssigned.has(index)) index = Math.floor(Math.random() * preferences.length);

    // assign the voter to a group
    const grp = preferences[index].find(g => 
      pitches.includes(g)
      && (~~groupCounts[g] < groupSize || (remainder > 0 && ~~groupCounts[g] === groupSize))
    );
    result[index] = grp;

    if (groupCounts[grp] >= groupSize) remainder--;

    // mark the group as full
    groupCounts[grp] = ~~groupCounts[grp] + 1;
    alreadyAssigned.add(index);
  }

  return result;
};

const randomSample = (preferences, pitches, sampleSize = 999) => {
  let result = [];
  let bestScore = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < sampleSize; i++) {
    const r = literallyRandom(preferences, pitches);
    const s = analyzeResult({ preferences, pitches }, r, false)[0];

    if (s < bestScore) {
      result = r;
      bestScore = s;
    }
  }

  return result;
};

export default (data, opts = {}) => {
  const options = {
    algorithm: randomSample,
    raw: true,
    loud: false,
    ...opts
  };

  // clean up data
  const parsedData = options.raw ? {
    ...data,
    preferences: data.preferences.map(p => p.preferences),
    pitches: data.pitches.map(p => p.id)
  } : data;

  // remove duplicates
  parsedData.preferences = parsedData.preferences.map(pref => pref.filter((v, i) => pref.indexOf(v) === i));
  
  // take only top G groups
  if (parsedData.pitches.length > parsedData.G) parsedData.pitches = findTopGroups(parsedData);

  // calculate results
  const { preferences, pitches } = parsedData;
  if (options.loud) console.log(preferences, pitches);

  const rawResults = options.algorithm(preferences, pitches);
  const results = rawResults.reduce((acc, val, i) => {
    const userId = options.raw ? data.preferences[i].userId : i;
    acc[val] = acc[val] ? [...acc[val], userId] : [userId];
    return acc;
  }, {});

  if (options.loud) {
    analyzeResult(parsedData, rawResults, true);
    console.log(results);
  }
  
  return results;
};
