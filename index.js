const fastify = require('fastify')({
    logger: true
});
const { searchWord } = require('./scraper');

fastify.get('/define/:word', function (request, reply) {
    searchWord(request.params.word).then(definitions => {
        reply.send(definitions)
    });
});

fastify.listen(process.env.PORT, '0.0.0.0', function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})