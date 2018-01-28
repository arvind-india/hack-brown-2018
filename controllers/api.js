const PythonShell = require('python-shell');

exports.parse = (req, res) => {

  var options = {
    args: ['aa', 'controllers/HAB/predict.npy']
  };

  PythonShell.run('controllers/HAB/recorder.py', (err, results) => {
    if (err || results[0] != 'Data Recorded') {
      console.log(results);
      res.json({
        status: 'failed',
        data: 'Leap Capture Failure'
      });
    } else {
      PythonShell.run('controllers/HAB/classifier.py', (err, results) => {
        if (err || results.length < 2) {
          console.log(results);
          res.json({
            status: 'failed',
            data: 'Classification Model Failure'
          });
        } else {
          res.json({
            status: 'success',
            data: results[1]
          });
        }
      });
    }
  });
};
