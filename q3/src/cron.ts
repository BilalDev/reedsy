import axios from "axios";
import { ExportJob, ImportJob, State } from "./models";

const base = 'http://localhost:3000/api/';

const handleJobs = () => {
    ['export', 'import'].forEach((endpoint: string) => {
        const handleJob = (job: ExportJob|ImportJob) => {
            axios({
                data: job,
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                url: `${base}${endpoint}`
            })
            .then(response => {
                console.log(response.data.message);
            }).catch(error => {
                console.log(error);
            });
        }

        axios.get(`${base}${endpoint}`)
        .then(response => {
            return response.data;
        })
        .then(jobs => {
            jobs.pendings.forEach((job: ExportJob|ImportJob) => {
                let now = Date.now();

                if (job.state !== State.finished && (now - job.created_at >= job.processing_time * 1000)) {
                    handleJob(job);
                }
            });
        })
        .catch(error => {
            console.log(error);
        });
    });
};

setInterval(() => {
    handleJobs();
}, 2000);