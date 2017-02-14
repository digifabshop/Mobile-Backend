<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\AssetTypesTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\AssetTypesTable Test Case
 */
class AssetTypesTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\AssetTypesTable
     */
    public $AssetTypes;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.asset_types'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('AssetTypes') ? [] : ['className' => 'App\Model\Table\AssetTypesTable'];
        $this->AssetTypes = TableRegistry::get('AssetTypes', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->AssetTypes);

        parent::tearDown();
    }

    /**
     * Test initialize method
     *
     * @return void
     */
    public function testInitialize()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test validationDefault method
     *
     * @return void
     */
    public function testValidationDefault()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }
}
