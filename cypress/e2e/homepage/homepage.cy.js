const filterRecords = ({
  data,
  searchTerm,
  filters,
}) => {
  return data.filter((item) => {
    const matchedSearchTerm =
      searchTerm && item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchedFilter =
      filters && filters.some((filter) => item.grades.includes(filter));
    if (searchTerm && (!filters || filters.length === 0)) {
      return matchedSearchTerm;
    } else if (!searchTerm && filters && filters.length > 0) {
      return matchedFilter;
    }
    return matchedSearchTerm && matchedFilter;
  });
};



describe('Wellness Card List', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.intercept('/api/records*', (req) => {
      req
        .reply((res) => {
          const dummyData = [
            {
              id: 1,
              title: 'Quick brown fox',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              grades: ['3-5', '6-8'],
            },
            {
              id: 2,
              title: 'Jump over',
              description:
                'Aenean turpis enim, feugiat porta efficitur nec, ultrices non ligula.',
              grades: ['9-12'],
            },
            {
              id: 3,
              title: 'A lazy dog',
              description:
                'Aliquam egestas felis et ex tempor, ut viverra erat placerat.',
              grades: ['6-8', '9-12'],
            },
          ];

          const { searchParams } = new URL(req.url);
          const searchTerm = searchParams.get('searchTerm');
          const filters = searchParams.getAll('filters');

          const filteredRecords = filterRecords({
            data: dummyData,
            searchTerm,
            filters,
          });

          const actualRecords = !searchTerm && (!filters || filters.length === 0) ? dummyData : filteredRecords;

          res.send({
            status: 200,
            body: actualRecords,
          });
        })
    }).as('getRecords');
  });

  it('renders the wellness card list with data', () => {
    cy.wait('@getRecords');

    cy.get('[data-testid=wellness-card-list]').should('exist');
    cy.get('[data-testid=wellness-card-item]').should('have.length', 3);

    cy.get('[data-testid=wellness-card-item]')
      .first()
      .then((firstElement) => {
        cy.wrap(firstElement).contains('Quick brown fox').should('exist');
        cy.wrap(firstElement)
          .contains('Lorem ipsum dolor sit amet, consectetur adipiscing elit')
          .should('exist');
        cy.wrap(firstElement).contains('3-5').should('exist');
      });
  });


  it('handles search and interactions', () => {
    cy.get('[data-testid=search-bar-input]').type('Quick');
    cy.get('[data-testid=search-bar-button]').click();

    cy.get('[data-testid=wellness-card-list]').should('exist');
    cy.get('[data-testid=wellness-card-item]').should('have.length', 1);

  });

});
