import Gun from "gun";
import 'gun/sea';
import 'gun/axe';

const gun = Gun({
    localStorage: false,
    peers: ['http://localhost:8765/gun']
});
const user = gun.user();
user.recall({ sessionStorage: true });

export default gun;
