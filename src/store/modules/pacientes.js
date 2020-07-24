// ~store/modules/pacientes.js

const pacientes = {
  firestorePath: 'pacientes',
  firestoreRefType: 'collection', // or 'doc'
  moduleName: 'pacientes',
  statePropName: 'data',
  namespaced: true, // automatically added
  sync: {
    preventInitialDocInsertion: true,
  },
  // this object is your store module (will be added as '/pacientes')
  // you can also add state/getters/mutations/actions
}

export default pacientes