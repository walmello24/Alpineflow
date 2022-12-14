document.addEventListener('alpine:init', () => {
    const setTemplate = (name, action = () => {}) => {
        Alpine.directive(name, (el, {expression}) => {
            let copy = document.createElement('template')
            copy.innerHTML = el.innerHTML;
            [...el.attributes].forEach(attr => {
                copy.setAttribute(attr.nodeName, attr.nodeValue)
            })
            copy.removeAttribute('x-'+name)
            action(copy, expression)
            el.parentNode.replaceChild(copy, el)
        })
    }

    setTemplate('template')
    setTemplate('foreach', (el, expression) => {
        console.log(expression)
        el.setAttribute('x-for', expression)
    })

    Alpine.directive('mods', (el, {expression}) => {
        let attrs = [...el.attributes]
            .filter(item => item.nodeName.split('-')[0] == 'x')
            .map(attr => attr.name)

        let newAttrs = attrs.map(attr => {
            attr = attr.split(':').join('.')
            attr = attr.replace(/\./, ':')

            return attr
        })

        newAttrs.forEach((attr, index) => {
            el.setAttribute(attr,el.getAttribute(attrs[index]))
        })

        attrs.forEach(attr => {
            el.removeAttribute(attr)
        })

        el.removeAttribute('x-mods')            
    })
})