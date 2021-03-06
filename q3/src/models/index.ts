interface IJob {
    state: State;
    created_at: number;
    updated_at: number;
    bookId: string;
    type: string;
    processing_time: number;
}

interface IExportJob extends IJob {
    url: string;
}

enum ProcessingTime {
    epub = 10,
    pdf = 25,
    import = 60
}

enum State {
    pending = 'pending',
    finished = 'finished'
}

enum ExportType {
    word = 'epub',
    pdf = 'pdf'
}

enum ImportType {
    word = 'word',
    pdf = 'pdf',
    wattpad = 'wattpad',
    evernote = 'evernote'
}

class ExportJob implements IExportJob {
    public state: State = State.pending;
    public created_at: number = Date.now();
    public updated_at: number = 0;
    public bookId: string;
    public type: string;
    public processing_time: number;
    public url: string;

    constructor(bookId: string, type: string, url: string) {
        this.bookId = bookId;
        this.type = type;
        this.url = url;
        this.processing_time = (this.type === ExportType.pdf) ? ProcessingTime.pdf : ProcessingTime.epub;
    }

    public static update(exportJob: IExportJob) : ExportJob {
        let now = Date.now();

        if (exportJob.state != State.finished && (now - exportJob.created_at >= exportJob.processing_time * 1000)) {
            let now = Date.now();
            exportJob.updated_at = now;
            exportJob.state = State.finished;
        }

        return exportJob;
    }
}

class ImportJob implements IJob {
    public state: State = State.pending;
    public created_at: number = Date.now();
    public updated_at: number = 0;
    public bookId: string;
    public type: string;
    public processing_time: number = 60;

    constructor(bookId: string, type: string) {
        this.bookId = bookId;
        this.type = type;
    }

    public static update(importJob: IJob) : ImportJob {
        let now = Date.now();

        if (importJob.state != State.finished && (now - importJob.created_at >= importJob.processing_time * 1000)) {
            let now = Date.now();
            importJob.updated_at = now;
            importJob.state = State.finished;
        }

        return importJob;
    }
}

export { ExportJob, ImportJob, State };