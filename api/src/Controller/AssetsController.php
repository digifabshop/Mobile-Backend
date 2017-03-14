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

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
        $this->Crud->listener('relatedModels')->relatedModels(['AssetTypes', 'Projects', 'Tags'], 'index');
        $this->Crud->listener('relatedModels')->relatedModels(['AssetTypes', 'Projects', 'Tags'], 'view');
        $this->Crud->listener('relatedModels')->relatedModels(['Tags'], 'add');
        $this->Crud->listener('relatedModels')->relatedModels(['Tags'], 'edit');
    }

    function upload() {
        $ext  = explode('/', $this->request->data['file']['type']);
        $name = uniqid() . '.' . $ext[1];
        $path = '/var/www/html/api/webroot/uploads/' . $name;
        $url  = "/uploads/$name";
        if (move_uploaded_file($this->request->data['file']['tmp_name'], $path)) {
            $this->set('response', ['url' => $url]);
            $this->set('_serialize', 'response');
        }
    }
}
