let projectile = (elem) => {
    let targets = Array.prototype.slice.call(document.querySelectorAll(elem));

    targets.map(obj => {
        obj.addEventListener('click', (_obj) =>{
            let id = "n" + Math.ceil(Math.random() * 100000);
            let copy = _obj.target.outerHTML.replace('class=', `class="animation ${id} ${elem.replace('.', '')}`);
                document.body.insertAdjacentHTML('beforeend', copy);
            let pos = {"x": obj.getBoundingClientRect().left, y: obj.getBoundingClientRect().top};
            target('.target').trigger(id, pos);
        });
    });
};

let target = (elem) => {
    let pos = {};
    let target = document.querySelector(elem);
        pos.x = target.getBoundingClientRect().left;
        pos.y = target.getBoundingClientRect().top;

    const trigger = (id, _pos) => {
        let animFrom = document.createElement('style');
            animFrom.classList = id;
        animFrom.appendChild(document.createTextNode(`
        ${'.' + id} {
            position: absolute;
            opacity: 0.5;
            left: ${_pos.x}px;
            top: ${_pos.y}px;
        }`));
        let animTo = document.createElement('style');
            animTo.classList = id;
            animTo.appendChild(document.createTextNode(`
            ${'.' + id} {
                transition-duration: 1s;
                left: ${pos.x}px;
                top: ${pos.y}px;
            }`));
            
            document.body.insertBefore(animFrom, document.getElementById(".bin"));
            setTimeout(() => {
                document.body.insertBefore(animTo, document.getElementById(".bin"));
            });
            setTimeout(() =>{
                function removeElementsByClass(className){
                    const elements = document.getElementsByClassName(className);
                    while(elements.length > 0){
                        elements[0].parentNode.removeChild(elements[0]);
                    }
                }
                removeElementsByClass(id);
            },1000);
        };

    return {"pos": pos, "trigger": trigger};
};



var basket = target('.target').pos;
var item = projectile('.projectile');