<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Assets Controller
 *
 * @property \App\Model\Table\AssetsTable $Assets
 */
class AssetsController extends AppController
{
    function upload() {
        $ext  = explode('/', $this->request->data['file']['type']);
        $name = uniqid() . '.' . $ext[1];
        $path = '/var/www/html/webroot/uploads/' . $name;
        $url  = "/uploads/$name";
        if (move_uploaded_file($this->request->data['file']['tmp_name'], $path)) {
            $this->set('response', ['url' => $url]);
            $this->set('_serialize', 'response');
        }
    }
}
