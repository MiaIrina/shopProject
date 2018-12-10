

let _makeCategory = ({
                         id,
                         name,
                         description,

                     }) => {
    return $(` <a class="dropdown-item link" data-name-id="${description}" data-cat-id="${id}">`).text(name);
};
module.exports=_makeCategory;