const { TextDecoder, TextEncoder } = require('util');
const { ReadableStream } = require('stream/web');
const { MessageChannel } = require('worker_threads');

global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;
global.ReadableStream = ReadableStream;
global.MessageChannel = MessageChannel;
global.MessagePort = new MessageChannel().port1.constructor;

const Enzyme = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

Enzyme.configure({ adapter: new Adapter() });
