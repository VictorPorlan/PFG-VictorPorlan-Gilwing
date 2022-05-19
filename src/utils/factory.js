import web3 from './web3'
import Factory from '../eth/build/Factory.json'
import FactoryAddress from '../eth/build/FactoryAddress.json'

const instance = new web3.eth.Contract(
    Factory.abi,
    FactoryAddress.factory
)

export default instance;