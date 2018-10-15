import React from 'react';
import App from './App';
import MainScreen from './src/screens/MainScreen';
import ContentList from './src/screens/ContentList';
import DetailPage from './src/screens/DetailPage';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});

describe('MainScreen test Suit', () => {
  it('renders MainScreen without crashing', () => {
    const rendered = renderer.create(<MainScreen />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});

describe('ContentList test Suit', () => {
  it('renders ContentList without crashing', () => {
    const navigation = {state: {
        params: {
          option: jest.fn()
        }
      },
      setParams: jest.fn()
    }

    const rendered = renderer.create(<ContentList navigation={navigation} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});

describe('DetailPage test Suit', () => {
  it('renders DetailPage without crashing', () => {
    const navigation = {state: {
        params : {
          detailArg: {
            pageInfo: jest.fn(),
            item: {
              name: jest.fn()
            }
          }
        }
      },
      setParams: jest.fn()
    }

    const rendered = renderer.create(<DetailPage navigation={navigation} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});