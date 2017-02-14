<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * AssetTypes Model
 *
 * @method \App\Model\Entity\AssetType get($primaryKey, $options = [])
 * @method \App\Model\Entity\AssetType newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\AssetType[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\AssetType|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\AssetType patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\AssetType[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\AssetType findOrCreate($search, callable $callback = null, $options = [])
 */
class AssetTypesTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->table('asset_types');
        $this->displayField('name');
        $this->primaryKey('id');

        $this->addBehavior('Search.Search');
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {
        $validator
            ->integer('id')
            ->allowEmpty('id', 'create');

        $validator
            ->allowEmpty('name');

        return $validator;
    }
}
