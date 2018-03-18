import { Parser } from 'binary-parser';

const filenameParser = Parser.start()
  .string('', {
    zeroTerminated: true,
  });

const objectParser = Parser.start()
  .endianess('little')
  .uint32('version')
  .uint32('file_size')
  .skip(4)
  .uint32('offset');

const wadParser = Parser.start()
  .endianess('little')
  .string('magic', { length: 4, assert: 'WWAD' })
  .uint32('file_count')
  .array('relative_paths', {
    type: filenameParser,
    length: 'file_count',
  })
  .array('absolute_paths', {
    type: filenameParser,
    length: 'file_count',
  })
  .array('objects', {
    type: objectParser,
    length: 'file_count',
  });

export default wadParser;