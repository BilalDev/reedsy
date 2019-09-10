import axios from "axios";

/**
 * Export job test
 */
describe('#postExport()', () => {
    it('should post export job', async () => {
        const response = await axios({
            data: {
                'bookId': 'Moby Dick',
                'type': 'pdf',
                'url': 'https://mobydick.fr'
            },
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            url: `http://localhost:3000/api/export`
        });

        expect(response).toBeDefined();
        expect(response.data.message).toEqual('Export job.');
    });
});

describe('#postExport() with fail param', () => {
    it('should fail with status code 422', async () => {
        try {
            await axios({
                data: {
                    'bookId': 'Moby Dick',
                    'type': 'pdf'
                },
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                url: `http://localhost:3000/api/export`
            });
        }
        catch (exception) {
            expect(exception).toBeDefined();
            expect(exception.message).toEqual('Request failed with status code 422');
        }
    });
});

describe('#getExports()', () => {
    it('should load export jobs by state', async () => {
        const response = await axios.get(`http://localhost:3000/api/export`);
        expect(response).toBeDefined();
        expect(response.data.pendings[0].bookId).toEqual('Moby Dick');
    });
});

/**
 * Import job
 */
describe('#postImport()', () => {
    it('should post import job', async () => {
        const response = await axios({
            data: {
                'bookId': 'Dracula',
                'type': 'evernote'
            },
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            url: `http://localhost:3000/api/import`
        });

        expect(response).toBeDefined();
        expect(response.data.message).toEqual('Import job.');
    });
});

describe('#postImport() with fail param', () => {
    it('should fail with status code 422', async () => {
        try {
            await axios({
                data: {
                    'bookId': 'Dracula',
                    'type': 'evernote',
                    'url': 'https://dracula.fr'
                },
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                url: `http://localhost:3000/api/import`
            });
        }
        catch (exception) {
            expect(exception).toBeDefined();
            console.log(exception.message);
            expect(exception.message).toEqual('Request failed with status code 422');
        }
    });
});

describe('#getImports()', () => {
    it('should load import jobs by state', async () => {
        const response = await axios.get(`http://localhost:3000/api/import`);
        expect(response).toBeDefined();
        expect(response.data.pendings[0].bookId).toEqual('Dracula');
    });
});
