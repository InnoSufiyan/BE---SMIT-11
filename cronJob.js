import cron from 'node-cron'

console.log("==>> file is working")

cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
});