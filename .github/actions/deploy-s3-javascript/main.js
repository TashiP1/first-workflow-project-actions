const core = require("@actions/core")
// const github = require("@actions/github")
const exec = require("@actions/exec")

function run(){
    const bucket = core.getInput('bucket', {required: true });
    const bucket_region = core.getInput('bucket-region', {required: true });
    const dist_folder = core.getInput('dist-folder', {required: true });

    const s3Uri = `s3://${bucket}`;
    exec.exec(`aws s3 sync ${dist_folder} ${s3Uri} --region ${bucket_region}`);

    const websiteUrl = `http://${bucket}.s3-website-${bucket_region}.amazonaws.com`;
    core.setOutput(websiteUrl);
 }

run();