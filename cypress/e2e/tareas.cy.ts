describe('Componente Dinámico', () => {
  beforeEach(() => {
    cy.visit('/tareas'); 
  });

  it('Debe permitir agregar elementos dinámicamente', () => {
    cy.get('ion-input[type="text"]').type('Nuevo Elemento');
    cy.get('ion-button').contains('Agregar').click();
    cy.get('.lista-elementos').should('contain', 'Nuevo Elemento');
  });

  it('Debe permitir eliminar elementos de la lista', () => {
    cy.get('.lista-elementos').find('ion-item').first().contains('Elemento a Eliminar').click();
    cy.get('.lista-elementos').should('not.contain', 'Elemento a Eliminar');
  });
});
