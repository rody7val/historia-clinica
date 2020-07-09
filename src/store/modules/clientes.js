// ~store/modules/clientes.js

const clientes = {
  firestorePath: 'clientes',
  firestoreRefType: 'collection', // or 'doc'
  moduleName: 'clientes',
  statePropName: 'data',
  namespaced: true, // automatically added
  sync: {
    preventInitialDocInsertion: true,
  },
  // this object is your store module (will be added as '/clientes')
  // you can also add state/getters/mutations/actions
}

export default clientes