<?php 


ini_set('display_errors','1');
ini_set('display_startup_errors','1');
error_reporting(true);

if(exec('echo EXEC') == 'EXEC'){
    echo 'exec works<hr>';
}

print exec('which ffmpeg');

echo "<hr>";

echo exec('whoami');

echo "<hr>";

echo exec('$PATH');
echo "<hr>";


$php_location = exec("which php");
var_dump($php_location);
echo "php Version and location : ".$php_location."<hr>";



//$ffmpeg = trim(shell_exec('which ffmpeg')); // or better yet:
$ffmpeg = shell_exec('type php');

    if (empty($ffmpeg))
{
    die('ffmpeg not available');
}
print_r($ffmpeg);
?>