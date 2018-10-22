import { StatusTypes, ResolutionTypes } from './Status';

describe('status types', () => {

    it('matches the snapshot', () => {
        expect(StatusTypes).toMatchSnapshot();
        expect(ResolutionTypes).toMatchSnapshot();
    });

});