require(['../dist/index'], function (dom) {

    ((window) => {

        console.log(dom.Query.array('p'));

        var p = dom.Query.first('p');
        console.log(p);

        dom.Control.toggleClass(p, 'woot');

    
    })(window);
});


