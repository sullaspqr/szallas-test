/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import App from '../App';
import '@testing-library/jest-dom';

// Mocking the fetchHitelesitessel function
jest.mock('../AuthService', () => {
  return {
    fetchHitelesitessel: {
      get: jest.fn((url) => {
        if (url === 'https://kodbazis.hu/api/szallasok') {
          return Promise.resolve({
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
          });
        } else {
          return Promise.resolve({
            data: {
              id: 1,
              name: 'Test Szallas',
              host_name: 'Test Host',
              neighbourhood: 'Test Neighbourhood',
              neighbourhood_group: 'Test Neighbourhood Group',
              minimum_nights: 2,
              price: 100
            }
          });
        }
      })
    }
  };
});

describe('App component tests', () => {
  it('renders login page', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/bejelentkezes']}>
          <App />
        </MemoryRouter>
      );
    });
    expect(await screen.getByText('Bejelentkezés')).toBeInTheDocument();
  });

  it('renders all accommodations page', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/osszes-szallas']}>
          <App />
        </MemoryRouter>
      );
    });
    expect(await screen.findByText('Megnevezés')).toBeInTheDocument();
  });

  it('renders accommodation details page', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/szallas/1']}>
          <App />
        </MemoryRouter>
      );
    });
    expect(await screen.findByText('Test Szallas')).toBeInTheDocument();
  });

  it('redirects to login page for unknown route', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/valami-ervenytelen-utvonal']}>
          <App />
        </MemoryRouter>
      );
    });
    expect(await screen.getByText('Bejelentkezés')).toBeInTheDocument();
  });
});
