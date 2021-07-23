const config = {
    duration : 1 //seconds
}

const shots = (elem) => {
    let shot = Array.prototype.slice.call(document.querySelectorAll(elem));
    shot.map(obj => {
        obj.getElementsByClassName("shoot")[0].addEventListener('click', (_obj) => {
            let id = "copy-" + Math.ceil(Math.random() * 100000);
            let copy = _obj.target.parentElement.outerHTML.replace('class=', `class="${id} ${elem.replace('.', '')}`);

            document.body.insertAdjacentHTML('beforeend', copy);

            let pos = { "x": obj.getBoundingClientRect().left, y: obj.getBoundingClientRect().top };

            target('.target').flyAnimation(id, pos);
        });
    });
};

const target = (elem) => {
    let pos = {};
    pos.x = document.querySelector(elem).getBoundingClientRect().left;
    pos.y = document.querySelector(elem).getBoundingClientRect().top;

    const flyAnimation = (_id, _pos) => {
        let animFrom = document.createElement('style');
        animFrom.classList = _id;
        animFrom.appendChild(document.createTextNode(`
            ${'.' + _id} {
                position: absolute;
                opacity: 0.5;
                left: ${_pos.x}px;
                top: ${_pos.y}px;
                transform: scale(1);
            }`));
        let animTo = document.createElement('style');
        animTo.classList = _id;
        animTo.appendChild(document.createTextNode(`
            ${'.' + _id} {
                transition-duration: ${config.duration}s;
                left: ${pos.x}px;
                top: ${pos.y}px;
                transform: scale(0.1);
            }`));

        document.body.insertBefore(animFrom, document.getElementById("body"));
        setTimeout(() => {
            document.body.insertBefore(animTo, document.getElementById("body"));
        });
        setTimeout(() => {
            function removeFromDOM(className) {
                document.body.querySelectorAll("."+className).forEach(n => n.remove());
            }
            removeFromDOM(_id);
        }, config.duration * 1000);
    };

    return { "pos": pos, "flyAnimation": flyAnimation };
};

//module.exports.shots;
//module.exports.target;

export {shots, target};