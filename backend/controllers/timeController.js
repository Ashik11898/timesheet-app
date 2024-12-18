
const getTime=(req,res)=>{
    // Set the necessary headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Send a simple message every 2 seconds
    let elapsedSeconds = 0;
    const intervalId = setInterval(() => {
        elapsedSeconds += 2;
        if (elapsedSeconds >= 14) {
            clearInterval(intervalId);
            res.write('data: Stream ended\n\n');
            res.end();
            return;
        }
        const currentTime = new Date().toLocaleTimeString();
        res.write(`data: Server time: ${currentTime}\n\n`);
    }, 2000);

    // Cleanup when the client disconnects
    req.on('close', () => {
        clearInterval(intervalId);
    });
}



module.exports = {getTime} 
