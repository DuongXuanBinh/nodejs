const fs = require('fs');
const server = require('http').createServer()

server.on('request',(req,res)=>{
    // Solution 1
    // fs.readFile('test-file.txt','utf8',(err,data)=>{
    //     if(err) console.log(err);
    //     res.end(data);
    // })

    // Solution 2: Streams => có thể xử lý logic trước khi trả về. Nếu nó xử lý quá nhanh sẽ bị backpressure
    // const readable = fs.createReadStream('test-file.txt');
    // readable.on('data',(chunk)=>{
    //     res.write(chunk);
    // })
    // readable.on('end',()=>{
    //     res.end();
    // })
    //
    // readable.on('error',(err)=>{
    //     console.log(err)
    //     res.statusCode = 500;
    //     res.end('File not found');
    // })

    //Solution 3: Streams => tạo pipe đến thẳng response
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res)
})

server.listen(8000, '127.0.0.1', () => {
    console.log("Listening...");
});
