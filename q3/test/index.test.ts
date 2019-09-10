import axios from "axios";

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