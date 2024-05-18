const { execSync } = require('child_process');

function getContainerIP(containerName) {
    try {
        const command = `sudo lxc list ${containerName} --format json`;
        const output = execSync(command, { encoding: 'utf8' });
        const containers = JSON.parse(output);
        const container = containers[0]; // Suponiendo que solo hay un contenedor con ese nombre
        const ipv4Address = container.state.network.eth0.addresses.find(addr => addr.family === 'inet').address;
        return ipv4Address;
    } catch (error) {
        console.error('Error fetching container IP:', error);
        return null;
    }
}

module.exports=getContainerIP;
