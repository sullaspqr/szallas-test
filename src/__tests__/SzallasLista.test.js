/**
 * @jest-environment jsdom
 */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import SzallasLista from '../SzallasLista';
import '@testing-library/jest-dom'

// Mocking the fetchHitelesitessel function
jest.mock('../AuthService', () => ({
  fetchHitelesitessel: {
    get: jest.fn(() =>
      Promise.resolve({
        data: [
          {
            id: 1,
            name: 'Test Szallas',
            host_name: 'Test Host',
            neighbourhood: 'Test Neighbourhood',
            neighbourhood_group: 'Test Neighbourhood Group',
            minimum_nights: 2,
            price: 100
          }
        ]
      })
    )
  }
}));

describe('SzallasLista komponens tesztje', () => {
  it('Megjelenik a szállások listája', async () => {
    render(
      <MemoryRouter initialEntries={['/osszes-szallas']}>
        <SzallasLista />
      </MemoryRouter>
    );

    // Várakozunk, hogy a szállások listája megjelenjen
	await screen.findByText('Megnevezés');
	await screen.findByText('Helyszín');
	await screen.findByText('Minimum éjszakák száma');
	await screen.findByText('Ár');
	
	// Ellenőrizzük, hogy a szállások listája megjelenik-e
	expect(screen.getByText('Megnevezés')).toBeInTheDocument();
	expect(screen.getByText('Helyszín')).toBeInTheDocument();
	expect(screen.getByText('Minimum éjszakák száma')).toBeInTheDocument();
	expect(screen.getByText('Ár')).toBeInTheDocument();
  });
});