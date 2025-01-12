import cron from 'node-cron'

cron.schedule('*/10 * * * *', () => {
    console.log('running a task every minute');
});