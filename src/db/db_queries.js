const addItem = ({ Collection, data }) => {
    const newItem = new Collection(data);
    return newItem.save();
};
  
const addMany = ({ Collection, data }) => Collection.insertMany(data);
  
const getAllItems = ({
Collection, find, sort, populate,
}) => Collection.find(find || null)
.sort(sort || null)
.populate(populate || null);

const getItem = ({
Collection, find, sort, populate,
}) => Collection.findOne(find || null)
.sort(sort || null)
.populate(populate || null);

const updateItem = ({ Collection, find, update }) => Collection.updateOne(find, update);

const deleteItem = ({ Collection, find }) => Collection.deleteOne(find);

const deleteManyItems = ({ Collection, find }) => Collection.deleteMany(find);

export {
getAllItems,
getItem,
addItem,
addMany,
updateItem,
deleteItem,
deleteManyItems,
};
