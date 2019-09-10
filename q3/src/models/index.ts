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

class ExportJob {
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

    public static update(exportJob: any) : ExportJob {
        let now = Date.now();

        if (exportJob.state != State.finished && (now - exportJob.created_at >= exportJob.processing_time * 1000)) {
            let now = Date.now();
            exportJob.updated_at = now;
            exportJob.state = State.finished;
        }

        return exportJob;
    }
}