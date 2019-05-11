module.exports.handleResponse = function (p_msg, callback, error) {
    let msg = JSON.parse(p_msg);

    switch (msg.command) {
        case "add_case_here":
            break;
       
        default:
            console.log('No handler found!', msg);
            callback({
                command: 'default',
                data: msg
            });

    }
}