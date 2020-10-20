module.exports = {
  fields: {
    1: { label: 'Title', id: 1, isCompatible: true, },
    2: { label: 'Description', id: 2, isCompatible: false, },
  },

  paginationTypes: {
    1: { name: 'infinite-scroll', id: 1, },
    2: { name: 'paged', id: 2 },
  },

  sources: [
    {
      name: 'meQasa',
      url: 'https://meqasa.com',
      id: 1,
      startFromPage: 0,
      propertyDetailSelector: '.featured-image > a',
      fields: {
        1: {
          field: 1,  
        }
      },
    },
    {
      name: 'Business Ghana',
      url: 'https://businessghana.com',
      id: 2,
      propertyDetailSelector: '.featured-image > a',
      startFromPage: 0,
      paginationType: 1,
      fields: {
        1: {
          field: 1, 
        }
      },
    },
  ]
}