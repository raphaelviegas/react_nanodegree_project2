require('jest-localstorage-mock');
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import JestFetchMock from 'jest-fetch-mock'

configure({ adapter: new Adapter() });

global.fetch = JestFetchMock