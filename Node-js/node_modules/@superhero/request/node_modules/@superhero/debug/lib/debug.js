// color id
let cid = -1;

const
util       = require('util'),
dateformat = require('dateformat'),
colors     = ['blue','cyan','green','magenta','red','yellow'],
Debug      = module.exports = class
{
  constructor(options)
  {
    // cycles the colors to prevent duplicates
    cid = ++cid < colors.length ? cid : 0;

    // log messages counter, serial number
    this.sn     = 0;
    this.config = Object.assign(
    {
      maxArrayLength  : 10,
      maxObjectDepth  : 10,
      maxStringLength : 100,
      color           : colors[cid],
      colors          : true,
      date            : true,
      dateFormat      : 'yyyy-mm-dd HH:MM:ss',
      debug           : true,
      index           : false,
      prefix          : false,
      separator       : '\t'
    }, options);

    switch (this.config.color)
    {
      case 'black'  : this.color = '30'; break;
      case 'blue'   : this.color = '34'; break;
      case 'cyan'   : this.color = '36'; break;
      case 'green'  : this.color = '32'; break;
      case 'magenta': this.color = '35'; break;
      case 'red'    : this.color = '31'; break;
      case 'yellow' : this.color = '33'; break;
      case 'white'  : this.color = '37'; break;
    }
  }

  colorize(s)
  {
    return this.color
    ? '\x1b[' + this.color + 'm' + s + '\x1b[0m'
    : s;
  }

  escape(s)
  {
    return s && s.replace
    ? s.replace(/[\x00-\x09\x10-\x1F]/g, '')
    : s;
  }

  getInspectOptions()
  {
    const options =
    {
      depth          : this.config.maxObjectDepth,
      colors         : this.config.colors,
      maxArrayLength : this.config.maxArrayLength
    };

    return options;
  }

  log(...args)
  {
    this.sn = this.sn < Number.MAX_SAFE_INTEGER ? this.sn + 1 : 0;
    this.config.debug && console.log(
      [ this.config.prefix,
        this.config.date   && dateformat(new Date(), this.config.dateFormat),
        this.config.index  && this.sn
      ].filter(_=>_).concat(args).map(function(arg)
      {
        return typeof arg == 'object'
        ? util.inspect(arg, this.getInspectOptions())
        : this.colorize(this.escape(arg));
      }.bind(this)).join(this.config.separator));
  }
}

const static_debug = new Debug();
module.exports.log = static_debug.log.bind(static_debug);
