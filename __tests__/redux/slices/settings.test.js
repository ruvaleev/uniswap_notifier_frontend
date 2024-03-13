import * as settingsSliceActions from '__redux/slices/settings';
import createStore from '__redux/store';
import successFixture from '__mocks/fixtures/backend/getNotificationsSetting/success.json';

describe('settingsReducer', () => {
  let store;

  beforeEach(() => {
    store = createStore();
  });

  describe('fetchSettings', () => {
    const mockFetch = (status) => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => successFixture,
        status: status,
        ok: true
      }));
    }

    describe('when backend returned successful response', () => {
      beforeEach(() => {
        mockFetch(200)
      });

      it('fetches settings from backend', async () => {
        expect(store.getState().settingsReducer.settings.out_of_range).toEqual(undefined);

        await store.dispatch(settingsSliceActions.fetchSettings());

        expect(store.getState().settingsReducer.settings.out_of_range).toEqual(true);
      });
    })

    describe('when backend returned unauthorized error', () => {
      beforeEach(() => {
        mockFetch(401)
      });

      it('writes proper error to the store', async () => {
        expect(store.getState().settingsReducer.settings.out_of_range).toEqual(undefined);

        await store.dispatch(settingsSliceActions.fetchSettings());

        const state = store.getState().settingsReducer

        expect(state.settings.out_of_range).toEqual(undefined);
        expect(state.isError).toEqual(true);
        expect(state.error).toEqual('Unauthenticated');
      });
    })
  });

  describe('updateSettings', () => {
    const params = { out_of_range: false }
    const mockFetch = (status) => {
      global.fetch = jest.fn(() => Promise.resolve({
        status: status,
        ok: true
      }));
    }

    describe('when backend returned successful response', () => {
      beforeEach(() => {
        mockFetch(200)
      });

      it('updates settings with proper params', async () => {
        expect(store.getState().settingsReducer.settings.out_of_range).toEqual(undefined);

        await store.dispatch(settingsSliceActions.updateSettings(params));

        expect(store.getState().settingsReducer.settings.out_of_range).toEqual(false);
      });
    })

    describe('when backend returned unauthorized error', () => {
      beforeEach(() => {
        mockFetch(401)
      });

      it('writes proper error to the store', async () => {
        expect(store.getState().settingsReducer.settings.out_of_range).toEqual(undefined);

        await store.dispatch(settingsSliceActions.updateSettings(params));

        const state = store.getState().settingsReducer

        expect(state.settings.out_of_range).toEqual(undefined);
        expect(state.isError).toEqual(true);
        expect(state.error).toEqual('Unauthenticated');
      });
    })
  });
});
