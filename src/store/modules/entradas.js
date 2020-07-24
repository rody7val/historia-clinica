// ~store/modules/entradas.js

const entradas = {
  firestorePath: 'entradas',
  firestoreRefType: 'collection', // or 'doc'
  moduleName: 'entradas',
  statePropName: 'data',
  namespaced: true, // automatically added
  sync: {
    preventInitialDocInsertion: true,
  },
  // this object is your store module (will be added as '/entradas')
  // you can also add state/getters/mutations/actions
}

export default entradas