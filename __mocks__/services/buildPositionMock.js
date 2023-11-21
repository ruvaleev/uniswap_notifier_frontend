import { STATUSES } from "__services/buildPosition/constants";
import fulfilledPosition from '__mocks/fixtures/positions/fulfilledPosition';

export const buildPositionMock = ({position = fulfilledPosition, status = STATUSES.completed} = {}) => (
  jest.fn(() => Promise.resolve({status, position}))
);
