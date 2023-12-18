h('form', {class: 'login-form', action: 'login'}, [
    h('input', {type: 'text', name: 'user'}),
    h('input', {type: 'password', name: 'pass'}),
    h('button', {}, ['login'])
])

h('h1', { class: 'title' }, ['My counter'])
h('div', { class: 'container' }, [
    h('button', {}, ['decrement']),
    h('span', {}, ['0']),
    h('button', {}, ['increment'])
])

function lipsum(num){

    return  hFragment(
        Array(num).fill(h('p', {}, ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]))
    );
}

function h(){}
function hFragment(){}
