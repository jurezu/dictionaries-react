export function getDictionaries() {
  const dictionaries = [
    {
      _id: "5b21ca3eeb7f6fbccd471815",
      title: "Valid example",
      errors: [],
      entries: [
        {
          _id: "5b21ca3eeb7f6fbccd471811",
          domain: "Stonegrey",
          range: "Dark Grey"
        },
        {
          _id: "5b21ca3eeb7f6fbccd471812",
          domain: "Midnight Black",
          range: "Black"
        },
        {
          _id: "5b21ca3eeb7f6fbccd471813",
          domain: "Mystic Silver",
          range: "Silver"
        }
      ]
    },
    {
      _id: "5b21ca3eeb7f6fbccd471816",
      title: "Fork, chain example",
      entries: [
        {
          _id: "5b21ca3eeb7f6fbccd471893",
          domain: "Stonegrey",
          range: "Dark Grey",
          errors: { fork: true }
        },
        {
          _id: "5b21ca3eeb7f6fbccd471814",
          domain: "Stonegrey",
          range: "Grey",
          errors: { fork: true }
        },
        {
          _id: "5b21ca3eeb7f6fbccd471833",
          domain: "Midnight Black",
          range: "Black",
          errors: { chain: true }
        },
        {
          _id: "5b21ca3eeb7f6fbccd471831",
          domain: "Black",
          range: "New Black",
          errors: { chain: true }
        }
      ]
    },
    {
      _id: "5b21ca3eeb7f6fbccd471817",
      title: "Cycle, chain example",
      entries: [
        {
          _id: "5b21ca3eeb7f6fbccd471838",
          domain: "Stonegrey",
          range: "Dark Grey",
          errors: { cycle: true, chain: true }
        },
        {
          _id: "5b21ca3eeb7f6fbccd471839",
          domain: "Dark Grey",
          range: "Stonegrey",
          errors: { cycle: true, chain: true }
        }
      ]
    },
    {
      _id: "5b21ca3eeb7f6fbgcd471817",
      title: "Duplicte, chain example",
      entries: [
        {
          _id: "5b21ca3eeb7f6fbccd471838",
          domain: "Stonegrey",
          range: "Dark Grey",
          errors: { duplicate: true, chain: true }
        },
        {
          _id: "5b21ca3eeb3f6fbccd471838",
          domain: "Stonegrey",
          range: "Dark Grey",
          errors: { duplicate: true, chain: true }
        },
        {
          _id: "5b21ca3eeb7f6fbccd471839",
          domain: "Dark Grey",
          range: "Grey",
          errors: { chain: true }
        }
      ]
    }
  ];
  return dictionaries;
}
